import { UserSelectedCard } from "app/model/userSelectedCard";

export class Story {
    storyId: string;
    title: string;
    description: string;
    acceptanceCriteria: string;
    shirtSize: string;
    status: string;
    estimate: string;
    timeLimit: string;
    elapsedTime: string;
    completedDate: string;
    createdDate: string;
    createdBy: string;
    userSelectedCard: UserSelectedCard[];
    currentlySelectedStory: boolean;
    cardsHideFront: boolean;
    cardsHideBack: boolean;
    score: string;
    sequence: number;
    $key: string;
}
