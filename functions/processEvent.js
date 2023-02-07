module.exports.handler = async (event) => {
    let records = event.Records;
    let batchItemFailures = [];

    if (records.length) {
        for (const record of records) {
            try {
                const parsedBody = JSON.parse(record.body);

                if (typeof parsedBody.detail.vehicleNo != 'string') {
                    throw new Error("Vehicle Number must be a string.")
                }

                console.log('processing vehicle details ' + parsedBody.vehicleNo);
                console.log('processing is successful ' + record.messageId);
            } catch (err) {
                batchItemFailures.push({
                    itemIdentifier: record.messageId
                });
            }
        }
    }
    return { batchItemFailures };
}