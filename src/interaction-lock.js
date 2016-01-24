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

function requestLockOn(DOMNode) {
  if (isLocked(DOMNode)) { return null; }

  lockId += 1;
  lockNodes[lockId] = DOMNode;
  return lockId;
}

function releaseLock(lockId) {
  if (lockNodes[lockId]) {
    delete lockNodes[lockId];
    lockId -= 1;
  }
}

module.exports = {
  isLocked: isLocked,
  requestLockOn: requestLockOn,
  releaseLockOn: releaseLockOn
};