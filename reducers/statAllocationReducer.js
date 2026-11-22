const TOTAL_POINTS = 5;
const HP_PER_POINT = 2;
const ATTACK_PER_POINT = 1;

export function initialStatAllocationState(character) {
  return {
    baseHp: character.hp,
    baseAttack: character.attack,
    hpPoints: 0,
    attackPoints: 0,
    pointsRemaining: TOTAL_POINTS,
  };
}

export function statAllocationReducer(state, action) {
  switch (action.type) {
    case 'ADD_HP': {
      if (state.pointsRemaining <= 0) return state;
      return {
        ...state,
        hpPoints: state.hpPoints + 1,
        pointsRemaining: state.pointsRemaining - 1,
      };
    }

    case 'REMOVE_HP': {
      if (state.hpPoints <= 0) return state;
      return {
        ...state,
        hpPoints: state.hpPoints - 1,
        pointsRemaining: state.pointsRemaining + 1,
      };
    }

    case 'ADD_ATTACK': {
      if (state.pointsRemaining <= 0) return state;
      return {
        ...state,
        attackPoints: state.attackPoints + 1,
        pointsRemaining: state.pointsRemaining - 1,
      };
    }

    case 'REMOVE_ATTACK': {
      if (state.attackPoints <= 0) return state;
      return {
        ...state,
        attackPoints: state.attackPoints - 1,
        pointsRemaining: state.pointsRemaining + 1,
      };
    }

    case 'RESET':
      return initialStatAllocationState(action.payload.character);

    default:
      return state;
  }
}

export function getAllocatedStats(state) {
  return {
    hp: state.baseHp + state.hpPoints * HP_PER_POINT,
    attack: state.baseAttack + state.attackPoints * ATTACK_PER_POINT,
  };
}

export { TOTAL_POINTS, HP_PER_POINT, ATTACK_PER_POINT };
