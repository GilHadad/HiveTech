export interface ItemsList {
    name: string;
    active: boolean;

}

export interface Cost {
    name: string;
    active: boolean;
    estimatedCost: number;
    errorVelidation: string[];

}

export interface Step {
    number: Number;
    title: String;
    active: Boolean;
    description: String;
    duration: Number;
}
