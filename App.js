
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const CARD_VALUES = ['7', '8', '9', '10', 'J', 'Q', 'K', 'As'];
const CARD_SUITS = ['♦', '♥', '♠', '♣'];

const App = () => {
  const [cards, setCards] = useState([
    { value: '7', suit: '♦' },
    { value: '8', suit: '♦' },
    { value: '9', suit: '♦' },
    { value: 'As', suit: '♦' },
    { value: '', suit: '♦' },
    { value: '10', suit: '♦' },
    { value: 'Q', suit: '♦' },
    { value: 'K', suit: '♦' },
    { value: 'J', suit: '♦' },
  ]);

  const handleCenterCellClick = () => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.value === 'As') {
          return { ...card, value: '7' };
        }
        const currentIndex = CARD_VALUES.indexOf(card.value);
        const nextIndex = (currentIndex + 1) % CARD_VALUES.length;
        return { ...card, value: CARD_VALUES[nextIndex] };
      });
    });
  };

  const handleCardClick = (cardIndex) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const currentCard = newCards[cardIndex];
      const newSuitIndex = (CARD_SUITS.indexOf(currentCard.suit) + 1) % CARD_SUITS.length;
      newCards[cardIndex] = { ...currentCard, suit: CARD_SUITS[newSuitIndex] };
      return newCards;
    });
  };

  const renderCard = ({ item, index }) => {
    let suitColor = 'black'; 
    if (item.suit === '♥' || item.suit === '♠') {
      suitColor = 'red'; 
    } else if (item.suit === '♣') {
      suitColor = 'orange';
    }

    return (
      <TouchableOpacity onPress={() => handleCardClick(index)} key={index} style={styles.card}>
        <Text style={styles.cardText}>{item.value}</Text>
        <Text style={[styles.cardSuit, { color: suitColor }]}>{item.suit}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <View key={index} style={styles.cell}>
            {index === 4 && (
              <TouchableOpacity onPress={handleCenterCellClick} style={styles.centerCell}>
                <Text style={styles.centerCellText}></Text>
              </TouchableOpacity>
            )}
            {index !== 4 && renderCard({ item: card, index: index })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: 300,
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  centerCell: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCellText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: '80%',
    height: '80%',
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSuit: {
    fontSize: 30, 
  },
});

export default App;
