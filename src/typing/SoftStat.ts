import { HitOnRating } from '../enums/HitOnRatings';
import { MotivationRating } from '../enums/MotivationRatings';
import { SkillRating } from '../enums/SkillRatings';
import { SoftStatModifier } from './SoftStatModifier';

export interface SoftStat {
	baseRating: MotivationRating|SkillRating|HitOnRating;
	modifiers: SoftStatModifier[];
}
