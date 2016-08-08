var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();
var lockNodes = {};
var lockContainerNodes = {};
var lockId = 0;

function isLocked(DOMNode) {
	for (var id in lockNodes) {
		var node = lockNodes[id];
		while (node !== null) {
			if (node === DOMNode) { return true; }
			node = node.parentNode;
		}
	}

	for (var id in lockContainerNodes) {
		var container = lockContainerNodes[id];
		var parent = DOMNode;
		while (parent !== null) {
			if (parent === container) { return true; }
			parent = parent.parentNode;
		}
	}

	return false;
}
emitter.isLocked = isLocked;

function requestLockOn(DOMNode) {
	if (isLocked(DOMNode)) { return null; }

	lockId += 1;
	lockNodes[lockId] = DOMNode;
	emitter.emit('lock', DOMNode);
	return lockId;
}
emitter.requestLockOn = requestLockOn;

function requestContainerLockOn(DOMNode) {
	if (isLocked(DOMNode)) { return null; }

	lockId += 1;
	lockContainerNodes[lockId] = DOMNode;
	emitter.emit('container-lock', DOMNode);
	return lockId;
}
emitter.requestContainerLockOn = requestContainerLockOn;

function releaseLock(id) {
	var DOMNode = lockNodes[id] || lockContainerNodes[id];
	if (DOMNode) {
		delete lockNodes[id];
		delete lockContainerNodes[id];
		lockId -= 1;
		emitter.emit('unlock', DOMNode);
	}
}
emitter.releaseLock = releaseLock;

module.exports = emitter;
