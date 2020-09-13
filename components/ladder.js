export default function ladder(nLength, pVal) {
    this.nLength = nLength;

    this.grains = [];
    this.unstableIndexes = [];
    for (let i = 0; i < 2*this.nLength; i++) {
        let degree = ([0,this.nLength-1,this.nLength,2*this.nLength-1].includes(i) ? 2 : 3);
        let initialGrains = Math.random() < pVal ? degree : 0;
        this.grains.push(initialGrains);

        if (initialGrains === degree) this.unstableIndexes.push(i); 
    }

    this.adjDict = {};
    for (let i = 0; i < 2*this.nLength; i++) {
        this.adjDict[i] = [];
        for (let j = 0; j < 2*this.nLength; j++) {
            if (!((i === this.nLength-1 && j === this.nLength) || (i === this.nLength && j === this.nLength-1)) && 
                Math.abs(i-j) === 1 || Math.abs(i-j) === this.nLength) 
            {
                this.adjDict[i].push(j);
            }
        } 
    }

    this.update = function() {
        if (this.isStable()) return;
        let randIndex = this.unstableIndexes[Math.floor(this.unstableIndexes.length*Math.random())];
        this.topple(randIndex);
        return randIndex;
    }

    this.topple = function(index) {

        this.grains[index] -= this.adjDict[index].length;
        if (this.grains[index] < this.adjDict[index].length) {
            removeElement(this.unstableIndexes, index);
        }

        for (let i = 0; i < this.adjDict[index].length; i++) {
            let adjIndex = this.adjDict[index][i];
            this.grains[adjIndex] += 1;
            if (this.grains[adjIndex] >= this.adjDict[adjIndex].length && !this.unstableIndexes.includes(adjIndex)) {
                this.unstableIndexes.push(adjIndex);
            }
        }


    }


    this.isStable = () => (this.unstableIndexes.length === 0);

    function removeElement(array, element) {
        return array.splice(array.indexOf(element), 1);
    }
}