export default class EventsList {
    constructor(myLife, parent) {
        myLife.eventsList = this;
        this.myLife = myLife;
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.height = '350px';
        div.style.width = '200px';
        div.style.border = '1px solid black';
        div.style.borderRadius = '8px';
        div.id = 'events-list';
        const header = document.createElement('div');
        div.appendChild(header);
        header.style.display = 'flex';
        header.style.backgroundColor = '#1066B0';
        header.style.width = '100%';
        header.style.borderTopLeftRadius = '7px';
        header.style.borderTopRightRadius = '7px';
        header.style.height = '40px';
        header.style.color = 'white';
        header.style.borderBottom = '1px solid black';
        header.style.justifyContent = 'center';
        header.style.alignItems = 'center';
        const exit = document.createElement('div');
        exit.style.borderRadius = '100px';
        exit.style.backgroundColor = 'rgb(220,0,0)';
        exit.style.height = '40px';
        exit.style.width = '40px';
        exit.style.color = 'white';
        exit.style.position = 'absolute';
        exit.style.right = '-10px';
        exit.style.top = '-12px';
        exit.style.display = 'flex';
        exit.style.alignItems = 'center';
        exit.style.justifyContent = 'center';
        exit.style.fontFamily = 'Ubuntu';
        exit.style.fontSize = '23';
        exit.innerText = 'X';
        exit.style.cursor = "pointer";
        exit.addEventListener('mouseover', (e) => {
            exit.style.backgroundColor = '#FF0000';
        })
        exit.addEventListener('mouseout', (e) => {
            exit.style.backgroundColor = 'rgb(220,0,0)';
        })
        exit.addEventListener('mousedown', (e) => {
            exit.style.backgroundColor = 'rgb(169,1,1)'
        })
        exit.addEventListener('mouseup', (e) => {
                exit.style.backgroundColor = '#FF0000';
            }
        )
        exit.onclick = () => {
            div.remove();
            parent.eventsOpen = false;
        }
        header.appendChild(exit);
        const heading = document.createElement('h2');
        heading.style.fontFamily = 'Ubuntu';
        heading.innerText = 'Events';
        header.appendChild(heading)
        const mainPanel = document.createElement('div');
        div.style.flexDirection = 'column';
        div.style.alignItems = 'center';
        mainPanel.style.border = '1px solid black';
        mainPanel.style.borderTopLeftRadius = '8px';
        mainPanel.style.borderBottomLeftRadius = '8px';
        mainPanel.style.position = 'relative';
        mainPanel.style.top = '10px';
        mainPanel.style.width = '90%';
        mainPanel.style.backgroundColor = '#FFFFFF';
        mainPanel.style.overflowY = 'scroll';
        div.style.backgroundColor = '#FFFFFF';
        mainPanel.style.height = '75%';
        div.appendChild(mainPanel);
        this.mainPanel = mainPanel;

/// Events ///

        this.loadEvents();

/////////////
        const createEvent = document.createElement('button');
        createEvent.innerText = 'Create event';
        createEvent.style.border = '1px solid black';
        createEvent.style.position = 'absolute';
        createEvent.style.borderRadius = '8px';
        createEvent.style.bottom = '8px';
        createEvent.addEventListener('mouseover', (e) => {
            createEvent.style.backgroundColor = '#0069E2';
            createEvent.style.color = 'white';
        })

        createEvent.addEventListener('mousedown', (e) => {
            createEvent.style.backgroundColor = '#1066B0';
            createEvent.style.color = 'white';
        })
        createEvent.addEventListener('mouseup', (e) => {
            createEvent.style.backgroundColor = '#0069E2';
            createEvent.style.color = 'white';
        })

        createEvent.addEventListener('mouseout', (e) => {
            createEvent.style.backgroundColor = '#E1E1E1';
            createEvent.style.color = 'black';
        })
        createEvent.style.cursor = 'pointer';
        div.appendChild(createEvent);
        document.body.appendChild(div);
        $('#events-list').draggable();
    }

    loadEvents() {
        this.myLife.events.forEach(event => {
            if(!this.mainPanel.innerHTML.includes(`data-event-id="${event.id}"`)) {
                const evt = document.createElement('div');
                evt.classList.add('listed-event');
                evt.dataset.eventId = event.id;
                evt.style.display = 'flex';
                evt.style.justifyContent = 'center';
                evt.style.alignItems = 'center';
                const evtName = document.createElement('span');
                evtName.innerText = `${event.name}`;
                evtName.style.position = 'absolute';
                evtName.fontSize = '10px';
                evt.appendChild(evtName);
                evt.style.backgroundColor = 'rgba(224,236,246,0.74)';
                evt.style.borderBottom = '1px solid black';
                evt.style.borderRight = '1px solid black';
                evt.style.height = '20px';
                evt.style.width = '99.4%';
                evt.style.cursor = 'pointer';
                evt.addEventListener('mouseover', (e) => {
                    evt.style.backgroundColor = 'rgb(196,224,248)';
                })
                evt.addEventListener('mouseout', (e) => {
                    evt.style.backgroundColor = 'rgba(224,236,246,0.74)';
                });
                evt.addEventListener('click', (e) => {
                    if(this.myLife.currentRoomId !== event.room) {
                        this.myLife.divinity.changeRoom(event.room);
                    }
                })
                this.mainPanel.appendChild(evt);

            }


        })
    }
}

