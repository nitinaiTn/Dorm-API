const CronJob = require('cron').CronJob;
const job = new CronJob(
	'*/5 * * * * *',
	function() {
        let count = 0
		console.log('You will see this message every second' +count);
	},
	null,
	true,
	'Asia/BangKok'
);
// Use this if the 4th param is default value(false)
// job.start()
job.stop()

module.exports = job