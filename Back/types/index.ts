export {};

declare global {
	namespace Express {
		interface User {
			userId?: Number;
			email?: String;
			nickname?: String;
			refreshtoken?: String;
			provider?: String;
			snsId?: String;
		}
		interface Request {
			user?: User | undefined;
		}
	}
}