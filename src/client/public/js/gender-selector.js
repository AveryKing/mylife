
export default class GenderSelector {
    constructor() {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.position = 'relative';
        div.style.left = '30%';
        div.style.justifyContent = 'center';
        div.style.width = '500px';
        const background = document.createElement('img');
        background.src = 'assets/newplayer/background.png';
        background.style.width = '500px';
        div.appendChild(background);
        document.body.appendChild(div);
        const maleDiv = document.createElement('div');
        const femaleDiv = document.createElement('div');
        div.appendChild(maleDiv);
        div.appendChild(femaleDiv);
        const male = document.createElement('img');
        male.src = 'assets/newplayer/male.png';
        male.style.width = '150px';
        const female = document.createElement('img');
        female.src = 'assets/newplayer/female.png';
        female.style.width = '150px';
        male.style.opacity = '0.75';
        female.style.opacity = '0.75';
        maleDiv.style.position = 'absolute';
        maleDiv.style.left = '80px';
        maleDiv.style.width = male.style.width;
        maleDiv.style.top = '135px';
        femaleDiv.style.position = 'absolute';
        femaleDiv.style.right = '80px';
        femaleDiv.style.top = '135px';
        femaleDiv.style.width = female.style.width;
        maleDiv.appendChild(male);
        femaleDiv.appendChild(female);
        const selectButton = document.createElement('button');
        selectButton.innerText = 'Select';
        selectButton.style.borderRadius = '8px';
        selectButton.style.width = '80px';
        selectButton.style.height = '40px';
        selectButton.style.fontSize = '23px';
        selectButton.style.position = 'absolute';
        selectButton.style.top = '45%';
        selectButton.style.right = '24%';
        selectButton.style.backgroundColor = '#4bda4d';
        selectButton.style.border = '1px solid black';
        selectButton.style.display = 'none';

        maleDiv.appendChild(selectButton);
        const femaleSelectButton = selectButton.cloneNode(true);

        femaleDiv.appendChild(femaleSelectButton);

        selectButton.onmouseover = () => {
            selectButton.style.backgroundColor = 'rgb(0,255,33)';
        }

        femaleSelectButton.onmouseover = () => {
            femaleSelectButton.style.backgroundColor = 'rgb(0,255,33)';
        }

        selectButton.onmouseout = () => {
            selectButton.style.backgroundColor = '#4bda4d';
        }
        femaleSelectButton.onmouseout = () => {
            femaleSelectButton.style.backgroundColor = '#4bda4d';
        }


        const maleMouseOver = () => {
            selectButton.style.display = 'block';
            male.style.opacity = '1';
            male.style.transform = 'scale(1.05)';
        }
        const femaleMouseOver = () => {
            femaleSelectButton.style.display = 'block';
            female.style.opacity = '1';
            female.style.transform = 'scale(1.05)';
        }
        const maleMouseOut = () => {
            selectButton.style.display = 'none';
            male.style.opacity = '0.75';
            male.style.transform = 'scale(1)';
        }

        const femaleMouseOut = () => {
            femaleSelectButton.style.display = 'none';
            female.style.opacity = '0.75';
            female.style.transform = 'scale(1)';
        }
        let selectedGender = undefined;
        selectButton.onclick = () => {
            selectedGender = 1;
            console.log(selectedGender);
            female.style.backgroundColor = 'white';
            female.style.border = 'none';
            female.style.opacity = '0.8';
            male.style.opacity = '1';
            selectButton.style.display = 'none';
            male.style.border = '2px dashed green';
            male.style.backgroundColor = 'rgba(127,252,185,0.42)'
            maleDiv.removeEventListener('mouseover', maleMouseOver);
            maleDiv.removeEventListener('mouseout', maleMouseOut);
            femaleDiv.addEventListener('mouseover', femaleMouseOver);
            femaleDiv.addEventListener('mouseout', femaleMouseOut);

        }

        femaleSelectButton.onclick = () => {
            selectedGender = 2;
            console.log(selectedGender);
            male.style.backgroundColor = 'white';
            male.style.border = 'none';
            male.style.opacity = '0.8';
            female.style.opacity = '1';
            femaleSelectButton.style.display = 'none';
            female.style.border = '2px dashed green';
            female.style.backgroundColor = 'rgba(127,252,185,0.42)'
            femaleDiv.removeEventListener('mouseover', femaleMouseOver);
            femaleDiv.removeEventListener('mouseover', femaleMouseOut);
            maleDiv.addEventListener('mouseover', maleMouseOver);
            maleDiv.addEventListener('mouseout', maleMouseOut);

        }
        maleDiv.addEventListener('mouseover', maleMouseOver);
        femaleDiv.addEventListener('mouseover', femaleMouseOver)
        maleDiv.addEventListener('mouseout', maleMouseOut)
        femaleDiv.addEventListener('mouseout', femaleMouseOut)

        const nameDiv = document.createElement('div');
        nameDiv.style.position = 'absolute';
        nameDiv.style.top = '450px';
        const form = document.createElement('form');
        const nameInput = document.createElement('input');
        nameInput.placeholder = 'Username';
        nameInput.style.width = '100px';
        nameInput.style.borderRadius = '8px';
        nameInput.style.padding = '5px';
        nameInput.style.border = '2px solid darkgray';
        nameInput.style.marginRight = '30px';
        nameInput.addEventListener('focus', () => {
            nameInput.style.outline = 'none';
            nameInput.style.borderColor = '#9ecaed';
            nameInput.style.boxShadow = '0 0 10px #9ecaed';
        })
        nameInput.addEventListener('blur', () => {
            nameInput.style.border = '2px solid darkgray';
            nameInput.style.boxShadow = '';

        })
        form.appendChild(nameInput);
        nameDiv.appendChild(form);
        let submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.innerText = 'Next';
        submitButton.style.padding = '5px';
        submitButton.style.border = '2px solid darkgray';
        submitButton.style.borderRadius = '8px';
        submitButton.addEventListener('focus', () => {
            submitButton.style.outline = 'none';
            submitButton.style.borderColor = '#9ecaed';
            submitButton.style.boxShadow = '0 0 10px #9ecaed';
        })
        form.appendChild(submitButton);
        div.appendChild(nameDiv);

        form.onsubmit = (e) => {
            e.preventDefault();
            if(!selectedGender || nameInput.value.trim().length < 1) {
                //TODO: Replace with generic dialog.
                alert('Please choose a gender and username to continue.');
            }
        }

    }
}

