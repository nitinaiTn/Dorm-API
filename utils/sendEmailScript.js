const CronJob = require('cron').CronJob;
const job = new CronJob(
	'0 35 22 11 * *',
	function() {
        console.log('Running script every 11th day of the month at 10:35 PM');
	},
	null,
	true,
	'Asia/BangKok'
);
// Use this if the 4th param is default value(false)
// job.start()
// job.stop()

module.exports = job