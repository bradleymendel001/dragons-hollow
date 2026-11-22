export function initialBattleState(player, enemy) {
  return {
    playerHp: player.hp,
    playerMaxHp: player.hp,
    enemyName: enemy.name,
    enemyHp: enemy.hp,
    enemyMaxHp: enemy.hp,
    turn: 'player',
    log: ['A wild Goblin appears!'],
    inventory: [
      {id: 'potion', name: 'Health Potion', quantity: 2, heal: 15},
      {id: 'key', name: 'Rusty Key', quantity: 1},
    ]
  };
}

export function battleReducer(state, action) {
  switch (action.type) {
    case 'PLAYER_ATTACK': {
      const damage = action.payload.damage;
      return {
        ...state,
        enemyHp: Math.max(state.enemyHp - damage, 0),
        turn: 'enemy',
        log: [...state.log, `You hit the Goblin for ${damage}.`],
      };
    }

    case 'ENEMY_ATTACK': {
      const damage = action.payload.damage;
      return {
        ...state,
        playerHp: Math.max(state.playerHp - damage, 0),
        turn: 'player',
        log: [...state.log, `The Goblin hits you for ${damage}.`],
      };
    }

    case 'USE_ITEM': {
      const item = state.inventory.find((i) => i.id === action.payload.itemId);
      if (!item || !item.heal || item.quantity <= 0 ) return state;

      const newHP = Math.min(state.playerHp + item.heal, state.playerMaxHp);
      const newInventory = state.inventory.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
    );
      return {
        ...state,
        playerHp: newHP,
        inventory: newInventory,
        turn: 'enemy',
        log: [...state.log, `You use a ${item.name} and healed ${item.heal} HP.`],
      };
    }
    case 'RESET':
      return initialBattleState(action.payload.player, action.payload.enemy);

    default:
      return state;
  }
}
