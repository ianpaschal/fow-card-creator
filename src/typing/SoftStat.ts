import { HitOnRating, HitOnRatings } from '../enums/HitOnRatings';
import { MotivationRating, MotivationRatings } from '../enums/MotivationRatings';
import { SkillRating, SkillRatings } from '../enums/SkillRatings';
import { SoftStatModifier } from './SoftStatModifier';

export type SoftStatBaseRating = MotivationRating | SkillRating | HitOnRating;

export interface SoftStat {
	baseRating: SoftStatBaseRating;
	modifiers: SoftStatModifier[];
}

export function isMotivationRating(rating: string): rating is MotivationRating {
	return MotivationRatings[ rating as MotivationRating ] !== undefined;
}

export function isSkillRating(rating: string): rating is SkillRating {
	return SkillRatings[ rating as SkillRating ] !== undefined;
}

export function isHitOnRating(rating: string): rating is HitOnRating {
	return HitOnRatings[ rating as HitOnRating ] !== undefined;
}
