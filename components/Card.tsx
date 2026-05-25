import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Card from "./Card"; // your Card component

// Add unique ids for each card
const cardsData = [
  {
    id: "1",
    image: "https://via.placeholder.com/300x400?text=Image+1",
    title: "Card Title 1",
    chapter: "Chapter 1",
    stats: { views: "1.2k", likes: "300", comments: "45" },
  },
  {
    id: "2",
    image: "https://via.placeholder.com/300x400?text=Image+2",
    title: "Card Title 2",
    chapter: "Chapter 2",
    stats: { views: "980", likes: "150", comments: "20" },
  },
  {
    id: "3",
    image: "https://via.placeholder.com/300x400?text=Image+3",
    title: "Card Title 3",
    chapter: "Chapter 3",
    stats: { views: "2.1k", likes: "500", comments: "60" },
  },
  {
    id: "4",
    image: "https://via.placeholder.com/300x400?text=Image+4",
    title: "Card Title 4",
    chapter: "Chapter 4",
    stats: { views: "1.5k", likes: "350", comments: "30" },
  },
  {
    id: "5",
    image: "https://via.placeholder.com/300x400?text=Image+5",
    title: "Card Title 5",
    chapter: "Chapter 5",
    stats: { views: "3.2k", likes: "800", comments: "100" },
  },
];

export default function CardRow() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 10 }}>
        {cardsData.map((card) => (
          <Card
            key={card.id} // ✅ unique key
            image={card.image}
            title={card.title}
            chapter={card.chapter}
            stats={card.stats}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 10,
  },
});