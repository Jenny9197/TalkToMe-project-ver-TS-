export {};

declare global {
	namespace Express {
		interface SelectInfo {
			userId?: number;
			selectTitle?: string;
            selectDesc?: string;
            option1: number;
            option2: number;
            option3: number;
            option4: number;
            option5: number;
            endDate: Date;
		}
		interface Request {
			select?: SelectInfo | undefined;
		}
	}
}