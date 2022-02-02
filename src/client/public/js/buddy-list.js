import Utils from "./utils.js";

export default class BuddyList {
    constructor(buddies) {
        console.table(buddies)
        const mainDiv = document.createElement('div');
        ///mainDiv.style.display = "none";
        mainDiv.classList.add('buddy-list');
        const header = document.createElement('div');
        header.classList.add('buddy-list-header');
        mainDiv.appendChild(header);
        const headerText = document.createElement('span');
        headerText.classList.add('header-text');
        headerText.innerText = "Buddy List (0/10)";
        header.appendChild(headerText);
        const panelBody = document.createElement('div');
        panelBody.classList.add('panel-body');
        const nameSearch = document.createElement('div');
        nameSearch.classList.add('name-search-div');
        panelBody.appendChild(nameSearch);
        const yourName = document.createElement('h3');
        yourName.innerText = "Avery";
        nameSearch.appendChild(yourName);
        const nameSearchInput = document.createElement('input');
        nameSearchInput.classList.add('name-search');
        nameSearch.appendChild(nameSearchInput);
        mainDiv.appendChild(panelBody);
        const buddiesPanel= document.createElement('div');
        buddiesPanel.classList.add('buddies-panel');
        panelBody.appendChild(buddiesPanel);
        Utils.get('mainDiv').appendChild(mainDiv);

        // Buddies ///////////
        Object.values(buddies).forEach(buddy => {
            const buddyDiv = document.createElement('div');
            buddyDiv.classList.add('buddy-div');
            buddiesPanel.appendChild(buddyDiv);
            const buddyName = document.createElement('span');
            buddyName.classList.add('buddy-name');
            buddyName.innerText = buddy.username;
            buddyDiv.appendChild(buddyName);
            const buddyLocation = document.createElement('span');
            buddyLocation.classList.add('buddy-location');
            buddyLocation.innerText = 'Lobby';
            buddyDiv.appendChild(buddyLocation);
            const buddyStatus = document.createElement('div');
           buddy.status
               ? buddyStatus.classList.add('buddy-status-offline')
               : buddyStatus.classList.add('buddy-status-online');

            buddyDiv.appendChild(buddyStatus);
        })

        $( ".buddy-list" ).draggable();





    }
}