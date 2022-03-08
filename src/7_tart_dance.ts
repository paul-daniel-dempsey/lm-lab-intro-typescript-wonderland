import { endAdventure, haveAdventures } from '..';
import { clear, print, askQuestion } from '../console';

const flavours = ['Custard', 'Jam', 'Cream', 'Donut','Chicken'] as const;
type Flavour = typeof flavours[number];
const ingredients = ['wheat', 'rice', 'pasta']
type Ingredient = typeof ingredients[number];

interface Tart {
    name : string
	flavour: Flavour;
    contains:() => Ingredient;
    vegetarian? : boolean
    vegan? : boolean
}

interface Plate {
	tarts: Array<Tart>;
}

export function tartDance() {
    
    clear(true);
    print('This bed 🛏 is still in wonderland!');
    const tartPlate = plateOfTarts();
    tartPlate.tarts.forEach(tart => { print(`${tart.name} ${tart.flavour} [${(tart.vegan ? `vegan` : ``)} ${(tart.vegetarian ? `vegetarian` : ``)}]`)});
    askQuestion('The Queens asks how many Custard tarts do you see? Get it right and you will truely wakeup!', tartCount);
}

export function tartCount(plateNo : string) {
    
    const plateCount = parseInt(plateNo);
    const tartPlate = plateOfTarts();

    if (Number(plateCount) === countItemsOnPlate(true,false,'Custard',tartPlate)) {

        const items = GetType<Plate>(tartPlate);
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
	return {tarts : [{ name : 'Yum1', flavour :'Custard', contains:() => 'wheat',vegetarian : true, vegan : false},
                     { name : 'Yum2', flavour :'Jam', contains:() => 'wheat', vegetarian : true, vegan : true},
                     { name : 'Yum3', flavour :'Cream', contains:() => 'pasta'},
                     { name : 'Yum4', flavour :'Custard', contains:() => 'wheat', vegetarian : true, vegan : false},
                     { name : 'Yum5', flavour :'Chicken', contains:() => 'rice', vegetarian : false, vegan : false},]};
}

function countItemsOnPlate(vegetarian :boolean, vegan : boolean,  flv : Flavour, plate : Plate) : number  {
    return plate.tarts.filter(tart => ((tart.flavour === flv) || 
                                       ((tart.flavour === flv) &&  (tart.vegan === vegan)) ||
                                       ((tart.flavour === flv) &&  (tart.vegan === vegan) && (tart.vegetarian === vegetarian)))).length
}

function GetType<T>(thing : T) : string {
    
    const type = typeof thing;
    if (type === 'object') {
            return 'Plates!';
    }
    return type;
}
