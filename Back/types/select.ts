export {};

declare global {
	namespace Express {
		interface SelectInfo {
			userId?: Number;
			selectTitle?: String;
            selectDesc?: String;
            option1: Number;
            option2: Number;
            option3: Number;
            option4: Number;
            option5: Number;
            endDate: Date;
		}
		interface Request {
			select?: SelectInfo | undefined;
		}
	}
}