export default class GenderSelector {
    constructor() {
        let div = document.createElement('div');
        div.style.display = 'flex';
        div.style.position = 'relative';
        div.style.left = '30%';
        div.style.justifyContent = 'center';
        div.style.width = '500px';
        let background = document.createElement('img');
        background.src = 'assets/newplayer/background.png';
        background.style.width = '500px';
        div.appendChild(background);
        document.body.appendChild(div);
        let maleDiv = document.createElement('div');
        let femaleDiv = document.createElement('div');
        div.appendChild(maleDiv);
        div.appendChild(femaleDiv);
        let male = document.createElement('img');
        male.src = 'assets/newplayer/male.png';
        male.style.width = '150px';
        let female = document.createElement('img');
        female.src = 'assets/newplayer/female.png';
        female.style.width = '150px';
        male.style.opacity = '0.75';
        female.style.opacity = '0.75';
        maleDiv.style.position = 'absolute';
        maleDiv.style.left = '80px';
        maleDiv.style.width = male.style.width;
        maleDiv.style.top = '150px';
        femaleDiv.style.position = 'absolute';
        femaleDiv.style.right = '80px';
        femaleDiv.style.top = '150px';
        femaleDiv.style.width = female.style.width;
        maleDiv.appendChild(male);
        femaleDiv.appendChild(female);
        let selectButton = document.createElement('button');
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
        let femaleSelectButton = selectButton.cloneNode(true);
        femaleDiv.appendChild(femaleSelectButton);

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
        maleDiv.addEventListener('mouseover', maleMouseOver);
        femaleDiv.addEventListener('mouseover', femaleMouseOver)

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
        maleDiv.addEventListener('mouseout', maleMouseOut)
        femaleDiv.addEventListener('mouseout', femaleMouseOut)

        let selectedGender = undefined;
        selectButton.onclick = () => {
            if (selectedGender !== 1) {
                selectedGender = 1;
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
            } else {

            }

        }

        femaleSelectButton.onclick = () => {
            if (selectedGender !== 2) {
                selectedGender = 2;
                male.style.backgroundColor = 'white';
                male.style.border = 'none';
                male.style.opacity = '0.8';
                female.style.opacity = '1';
                femaleSelectButton.style.display = 'none';
                female.style.border = '2px dashed green';
                female.style.backgroundColor = 'rgba(127,252,185,0.42)'
                femaleDiv.removeEventListener('mouseover',femaleMouseOver);
                femaleDiv.removeEventListener('mouseover',femaleMouseOut);
                maleDiv.addEventListener('mouseover', maleMouseOver);
                maleDiv.addEventListener('mouseout', maleMouseOut);
            } else {

            }

        }


    }
}