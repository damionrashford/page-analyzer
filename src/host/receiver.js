export function setupReceiver(receiver, root) {
  if (!receiver || !root) {
    throw new Error('Receiver and root element are required');
  }

  receiver.connect(root);
  return receiver;
}

