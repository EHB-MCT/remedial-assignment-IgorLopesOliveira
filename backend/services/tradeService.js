const User = require('../models/User');
const Resource = require('../models/Resource');

async function trade({ userId, resourceName, quantity, action }) {
  if (quantity <= 0) throw new Error('Quantity must be positive');
  if (!['buy', 'sell'].includes(action)) throw new Error('Action must be buy or sell');

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const resource = await Resource.findOne({ name: resourceName });
  if (!resource) throw new Error('Resource not found');

  const price = resource.currentPrice * quantity;

  if (action === 'buy') {
    if (user.balance < price) throw new Error('Insufficient balance');
    if (resource.stock < quantity) throw new Error('Not enough resource stock');

    user.balance -= price;
    resource.stock -= quantity;
    user.inventory.set(resourceName, (user.inventory.get(resourceName) || 0) + quantity);

  } else if (action === 'sell') {
    const ownedQty = user.inventory.get(resourceName) || 0;
    if (ownedQty < quantity) throw new Error('Not enough resource to sell');

    user.balance += price;
    resource.stock += quantity;
    user.inventory.set(resourceName, ownedQty - quantity);
  }

  await user.save();
  await resource.save();

  return { user, resource };
}

module.exports = { trade };
