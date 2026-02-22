import bycrypt from "bcrypt";


export async function HashPassword(password) {
	const saltRounds = 10;
	console.log(password);
	const hashedPassword = await bycrypt.hash(password, saltRounds);
	return hashedPassword;
}

export async function ComparePassword(password, hashedPassword) {
	console.log(password, hashedPassword);
	return await bycrypt.compare(password, hashedPassword);
}