import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda, DateData } from "react-native-calendars";

const Home: React.FC = () => {
  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState("");

  // 날짜별 일정 목록
  const [items, setItems] = useState<{ [key: string]: { name: string; time: string }[] }>({
    "2024-03-15": [{ name: "회의", time: "10:00 AM" }],
    "2024-03-16": [{ name: "운동", time: "6:00 PM" }],
    "2024-03-17": [
      { name: "독서", time: "2:00 PM" },
      { name: "산책", time: "5:00 PM" },
    ],
  });

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={"2024-03-15"}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        renderItem={(item: any) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemTime}>{item.time}</Text>
          </View>
        )}
        renderEmptyDate={() => (
          <View style={styles.emptyDate}>
            <Text style={styles.emptyText}>일정 없음</Text>
          </View>
        )}
        theme={{
          selectedDayBackgroundColor: "blue",
          selectedDayTextColor: "white",
          todayTextColor: "red",
          agendaDayTextColor: "#2d4150",
          agendaTodayColor: "blue",
          agendaKnobColor: "gray",
        }}
      />
      {selectedDate ? (
        <Text style={styles.selectedText}>선택한 날짜: {selectedDate}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemTime: {
    fontSize: 14,
    color: "#666",
  },
  emptyDate: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  selectedText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    marginVertical: 10,
  },
});

export default Home;