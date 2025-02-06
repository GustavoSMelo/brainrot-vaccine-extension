<!-- eslint-disable no-undef -->

<script setup lang="ts">
import {
    getAdultContentBlocked,
    getBetsBlocked,
    getCustomWebsitesBlocked,
    getSocialMediasBlocked,
} from "../helpers/getSyncStorageDatas";
import { IRestricted, IRestrictedCustom } from "../interfaces/restricted";

const props = defineProps({
    handleChangeSessionInformations: {
        type: Function,
        required: true,
    },
    handleRemountMainContent: {
        type: Function,
        required: true,
    },
    handleChangePopupMessage: {
        type: Function,
        required: true,
    },
    handleChangePopupStatus: {
        type: Function,
        required: true,
    },
    handleChangeShouldRenderPopupStatus: {
        type: Function,
        required: true,
    },
});

const handleDisableAll = () => {
    props.handleChangeSessionInformations("allContent", "All websites");
};
const handleEnableAll = async () => {
    const adultContent = await getAdultContentBlocked();
    const socialMedias = await getSocialMediasBlocked();
    const bets = await getBetsBlocked();

    adultContent.forEach((ac) => (ac.restricted = true));
    socialMedias.forEach((sm) => (sm.restricted = true));
    bets.forEach((bet) => (bet.restricted = true));

    await chrome.storage.sync.set({
        socialMediasBlocked: [...socialMedias],
        adultContentBlocked: [...adultContent],
        betsBlocked: [...bets],
    });

    props.handleRemountMainContent();
    props.handleChangePopupStatus("success");
    props.handleChangePopupMessage("All blockers enabled");
    props.handleChangeShouldRenderPopupStatus();
};

const handleExport = async () => {
    const csvData = [];
    csvData.push("");
    csvData.push("socialMedia");

    const socialMedias = await getSocialMediasBlocked();
    const adultContent = await getAdultContentBlocked();
    const bets = await getBetsBlocked();
    const customs = await getCustomWebsitesBlocked();

    for (let i = 0; i < socialMedias.length; i++) {
        csvData.push(socialMedias[i].siteName);
        csvData.push(socialMedias[i].restricted);
    }

    csvData.push("\n");

    csvData.push("adultContent");
    for (let i = 0; i < adultContent.length; i++) {
        csvData.push(adultContent[i].siteName);
        csvData.push(adultContent[i].restricted);
    }

    csvData.push("\n");

    csvData.push("bets");
    for (let i = 0; i < bets.length; i++) {
        csvData.push(bets[i].siteName);
        csvData.push(bets[i].restricted);
    }

    csvData.push("\n");
    csvData.push("customWebsites");

    for (let i = 0; i < customs.length; i++) {
        csvData.push(customs[i].siteName);
        csvData.push(customs[i].restricted);
        csvData.push(customs[i].siteURL);
    }

    const blob = new Blob([csvData.toString()], { type: "text/csv" });
    const aTag = document.createElement("a");

    aTag.href = URL.createObjectURL(blob);
    aTag.download = "bve.csv";
    aTag.click();
};

const handleOpenImportFile = () => {
    const inputCsvImport: HTMLFormElement = window.document.querySelector(
        "#inputCsvImport"
    ) as HTMLFormElement;
    inputCsvImport.click();
};

const handleImport = (event: Event) => {
    event.preventDefault();
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || !fileInput.files.length) return;

    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async (element) => {
        const resultReader = element.target?.result;

        console.log(resultReader);
        const arrayOfElements = resultReader?.toString().split("\n") ?? [];

        if (arrayOfElements.length === 0) {
            props.handleRemountMainContent();
            props.handleChangePopupStatus("error");
            props.handleChangePopupMessage("Error to upload file");
            props.handleChangeShouldRenderPopupStatus();

            return;
        }

        const socialMedias = arrayOfElements[0]
            .split(",")
            .slice(2, arrayOfElements[0].length - 1);
        const adultContents = arrayOfElements[1]
            .split(",")
            .slice(2, arrayOfElements[1].length - 1);
        const bets = arrayOfElements[2]
            .split(",")
            .slice(2, arrayOfElements[2].length - 1);
        const customs = arrayOfElements[3].split(",").slice(2);

        let socialMediaHelper: Array<IRestricted> = [];
        let adultContentHelper: Array<IRestricted> = [];
        let betsHelper: Array<IRestricted> = [];
        let customHelper: Array<IRestrictedCustom> = [];

        let objKey = "";

        socialMedias.map((item, index) => {
            if (index % 2 === 0) {
                console.log(`socialMediaSiteName: ${item}`);
                objKey = item.toString();
            } else {
                console.log(`${objKey}: ${item}`);
                socialMediaHelper.push({
                    siteName: objKey,
                    restricted: item === "true" ? true : false,
                });
                objKey = "";
            }
        });

        adultContents.map((item, index) => {
            if (index % 2 === 0) {
                objKey = item;
            } else {
                adultContentHelper.push({
                    siteName: objKey,
                    restricted: item === "true" ? true : false,
                });
                objKey = "";
            }
        });

        bets.map((item, index) => {
            if (index % 2 === 0) {
                objKey = item;
            } else {
                betsHelper.push({
                    siteName: objKey,
                    restricted: item === "true" ? true : false,
                });
                objKey = "";
            }
        });
        let customRestricted = "";
        let increment = 0;

        customs.map((item) => {
            if (customs.length <= 0) {
                return;
            }

            switch (increment) {
                case 0:
                    objKey = item;
                    increment++;
                    break;
                case 1:
                    customRestricted = item;
                    increment++;
                    break;
                case 2:
                    customHelper.push({
                        siteName: objKey,
                        restricted: customRestricted === "true" ? true : false,
                        siteURL: item,
                    });
                    objKey = "";
                    customRestricted = "";
                    increment = 0;
                    break;
                default:
                    break;
            }
        });

        console.log(socialMedias);
        console.log(adultContents);
        console.log(bets);
        console.log(socialMediaHelper);
        console.log(adultContentHelper);
        console.log(betsHelper);
        console.log(customHelper);

        await chrome.storage.sync.set({
            socialMediasBlocked: [...socialMediaHelper],
            adultContentBlocked: [...adultContentHelper],
            betsBlocked: [...betsHelper],
            customWebsites: [...customHelper],
        });
    };

    fileReader.onerror = async (element) => {
        console.error(element);
        props.handleRemountMainContent();
        props.handleChangePopupStatus("error");
        props.handleChangePopupMessage("Error to upload file");
        props.handleChangeShouldRenderPopupStatus();
    };

    fileReader.readAsText(file);
};
</script>
<template>
    <details>
        <summary>Advanced</summary>

        <article class="advancedContainer">
            <section class="row">
                <button
                    class="btnDisableAll"
                    type="button"
                    @click="handleDisableAll()"
                >
                    Disable all
                </button>
                <button
                    class="btnEnableAll"
                    type="button"
                    @click="handleEnableAll()"
                >
                    Enable all
                </button>
            </section>
            <section class="row">
                <input
                    value=""
                    type="file"
                    id="inputCsvImport"
                    @change="(event) => handleImport(event)"
                    accept=".csv"
                    tabindex="-1"
                />
                <button
                    class="btnImport"
                    type="button"
                    @click="handleOpenImportFile()"
                >
                    Import
                </button>
                <button class="btnImport" type="button" @click="handleExport()">
                    Export
                </button>
            </section>
        </article>
    </details>
</template>
