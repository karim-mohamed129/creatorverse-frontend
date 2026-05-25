import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Card from "./Card";

const MAX_WIDTH = 1200;

type Item = {
  id: string;
  img: string; // matches your data.ts
  title: string;
  chapter?: string;
  views?: string;
  likes?: string;
  comments?: string;
};

type SectionProps = {
  title: string;
  data: Item[];
  blog?: boolean;
};

const Section: React.FC<SectionProps> = ({ title, data, blog }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.section}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.seeMore}>See More ›</Text>
        </View>

        {/* Content */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {data.map((item) => (
            <Card
              key={item.id} // ✅ unique key
              image={item.img} // 🔥 map img -> image
              title={item.title}
              chapter={item.chapter}
              stats={
                blog
                  ? undefined
                  : {
                      views: item.views,
                      likes: item.likes,
                      comments: item.comments,
                    }
              }
              isBlog={blog}
            />
          ))}
        </ScrollView>

      </View>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },

  section: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    paddingHorizontal: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: "#111",
  },

  seeMore: {
    color: "#ccc",
    fontSize: 12,
  },

  scrollContent: {
    paddingHorizontal: 5,
  },
});