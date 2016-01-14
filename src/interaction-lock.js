var lockNodes = [];

function isLocked(DOMNode){
  for (var i = 0, len = lockNodes.length; i < len; i += 1) {
    var node = lockNodes[i];
    while (node !== null) {
      if (node === DOMNode) { return true; }
      node = node.parentNode;
    }
  }

  return false;
}

function requestLockOn(DOMNode) {
  if (isLocked(DOMNode)) { return false; }

  lockNodes.push(DOMNode);
  return true;
}

function releaseLockOn(DOMNode) {
  var index = lockNodes.indexOf(DOMNode);
  if (index !== -1) {
    lockNodes.splice(index, 1);
  }
}

module.exports = {
  isLocked: isLocked,
  requestLockOn: requestLockOn,
  releaseLockOn: releaseLockOn
};