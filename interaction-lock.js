var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();
var lockNodes = {};
var lockId = 0;

function isLocked(DOMNode) {
  for (var lockId in lockNodes) {
    var node = lockNodes[lockId];
    while (node !== null) {
      if (node === DOMNode) { return true; }
      node = node.parentNode;
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

function releaseLock(id) {
  const DOMNode = lockNodes[id];
  if (DOMNode) {
    delete lockNodes[id];
    lockId -= 1;
    emitter.emit('unlock', DOMNode);
  }
}
emitter.releaseLock = releaseLock;

module.exports = emitter;