export async function toggle_favorite(cardID: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/cards/${cardID}/favorite`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update favorite status');
    }
  } catch(err) {
    console.error(err);
  }
}

export async function toggle_owned(cardID: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/cards/${cardID}/owned`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update owned status');
    }
  } catch(err) {
    console.error(err);
  }
}
