function testFunction(error) {
	if (error.file) {
		const message = ts.flattenDiagnosticMessageText(error.messageText, '\n');
	}
}

let a = (a,b) => a + b
let b = (a,b) => a + b
let c = (a,b) => a + b
function formatErrorMessage(error) {

	if (error.file) {
		const message = ts.flattenDiagnosticMessageText(error.messageText, '\n');
		return (
			error.file.fileName +
			'(' +
			error.file.getLineAndCharacterOfPosition(error.start).line +
			'): ' +
			message
		);
	} else {
		return ts.flattenDiagnosticMessageText(error.messageText, '\n');
	}
}
