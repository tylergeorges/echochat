export const generateSnowflake = () => {
	const date = new Date();

	const snowflake =
		(BigInt(date.valueOf()) - BigInt(1420070400000)) << BigInt(22);

	return snowflake.toString();
};
