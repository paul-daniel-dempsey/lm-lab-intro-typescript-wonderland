import { endAdventure } from '..';
import { meetTheQueen } from './5_queen_of_hearts';
import { askQuestion, clear, print } from '../console';

// in Wonderland, croquet is played by using a flamingo to push a hedgehog through an arch made of playing cards
// (It's best not to worry too much about the practicalities of this)
type Ball = 'Hedgehog';
type Mallet = 'Flamingo';
interface Croquet<TBall, TMallet> {
	hit: (ball: TBall, mallet: TMallet) => boolean;
}

export function playCroquet(): void {
	clear(true);
	print('The Queen of Hearts 👑❤ invites you to play croquet 🏑');

	const game: Croquet<Ball, Mallet> = {
		hit: hit,
	};

	if (game && game.hit && game.hit('Hedgehog', 'Flamingo')) {
		print('🏆 Success! You scored! 🏆');
		print('Time to chat with the queen...');
		return askQuestion('Press ENTER to continue! ', meetTheQueen);
	} else {
		print(
			'😭 Sadly, you lost. And now the queen wants to decapitate you! 😱'
		);
		return endAdventure();
	}
}

function hit<T, U>(ball: T, mallet: U): boolean {
	let score = 0;

	// remember TypeScript only exists at compile time, so when this code *runs* the type we want (Ball)
	// will appear to be a string with value 'Hedgehog'
	if (typeof ball === 'string') {
		if (ball === 'Hedgehog') score += 50;
	}

	// remember TypeScript only exists at compile time, so when this code *runs* the type we want (Mallet)
	// will appear to be a string with value 'Flamingo'
	if (typeof mallet === 'string') {
		if (mallet === 'Flamingo') score += 50;
	}

	return score === 100;
}
