import { endAdventure, haveAdventures } from '..';
import { clear, print, askQuestion } from '../console';

const flavours = ['Custard', 'Jam', 'Cream', 'Donut','Chicken'] as const;
type Flavour = typeof flavours[number];
const ingredients = ['wheat', 'rice', 'pasta']
type Ingredient = typeof ingredients[number];

interface Pie {
    name : string
    flavour: Flavour;
    contains:() => Ingredient;
    tasty : boolean;
}

interface Tart {
    name : string
	flavour: Flavour;
    contains:() => Ingredient;
    vegetarian? : boolean
    vegan? : boolean
}

interface Plate {
	pastries: Array<Tart | Pie >;
}

export function tartDance() {
    
    clear(true);
    print('This bed 🛏 is still in wonderland!');
    const pastryPlate = plateOfTarts();
    pastryPlate.pastries.forEach(tart => { print(`${tart.name} ${tart.flavour} [contains:${(tart.contains)}]`)});
    askQuestion('The Queens asks how many Custard tarts do you see? Get it right and you will truely wakeup!', pastryCount);
}

export function pastryCount(plateNo : string) {
    
    const plateCount = parseInt(plateNo);
    const pastryPlate = plateOfTarts();

    if (Number(plateCount) === countItemsOnPlate('Custard',pastryPlate)) {

        const items = GetType<Plate>(pastryPlate);
        print(
            `✅ CONGRATULATIONS! You successfully counted the ${items} it through Wonderland! 🥳`
            );

        return askQuestion(
            'Press ENTER to re-enter Wonderland! ',
            haveAdventures
        );
    } else {
        print('You are unable to wake up! 😱');
        return endAdventure();
    }
}

function plateOfTarts(): Plate {

	return {pastries : [{ name : 'Tart1', flavour :'Custard', contains:() => 'wheat',vegetarian : true, vegan : false},
                     { name : 'Tart2', flavour :'Jam', contains:() => 'wheat', vegetarian : true, vegan : true},
                     { name : 'Tart3', flavour :'Cream', contains:() => 'wheat'},
                     { name : 'Tart4', flavour :'Custard', contains:() => 'wheat', vegetarian : true, vegan : false},
                     { name : 'Tart5', flavour :'Cream', contains:() => 'wheat', vegetarian : false, vegan : false},
                     { name : 'Pie1', flavour :'Chicken', contains:() => 'pasta',tasty: true},]};
}

function countItemsOnPlate(flv : Flavour, plate : Plate) : number  {
    return plate.pastries.filter(tart => (tart.flavour === flv)).length
}

function GetType<T>(thing : T) : string {
    
    const type = typeof thing;
    if (type === 'object') {
            return 'Plates!';
    }
    return type;
}
