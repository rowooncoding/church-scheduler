import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda, DateData } from "react-native-calendars";

const Home: React.FC = () => {
  // 현재 날짜 계산
  const today = new Date().toISOString().split('T')[0];
  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState(today);

  // 날짜별 일정 목록
  const [items, setItems] = useState<{ [key: string]: { name: string; memo: string; time: string }[] }>({
    "2025-03-15": [{ name: "회의", memo: "임시 메모", time: "10:00 AM" }],
    "2025-03-16": [{ name: "운동", memo: "임시 메모", time: "6:00 PM" }],
    "2025-03-17": [
      { name: "독서", memo: "임시 메모", time: "2:00 PM" },
      { name: "산책", memo: "임시 메모", time: "5:00 PM" },
      { name: "산책", memo: "임시 메모", time: "6:00 PM" },
      { name: "산책", memo: "임시 메모", time: "7:00 PM" },
    ],
  });

  // 현재 선택한 날짜가 `items`에 없으면 빈객체 추가로 undefined 반환
  const getAgendaItems = () => {
    return items[selectedDate] && items[selectedDate].length > 0
      ? { [selectedDate]: items[selectedDate] }
      : {}; 
  };
  // 현재 선택한 일자의 데이터만 랜더링
  const loadItemsForMonth = (day: DateData) => {
    const newItems = { ...items };

    // 선택한 날짜가 items에 없으면 빈 배열 추가
    if (!newItems[day.dateString]) {
      newItems[day.dateString] = [];
    }

    setItems(newItems);
  }

  // 일정이 존재하는 날짜에 . 표시
  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};

    // 일정이 있는 날짜에 점 추가
    Object.keys(items).forEach((date) => {
      if (items[date].length > 0) {
        marked[date] = { marked: true, dotColor: "blue" };
      }
    });

    // 선택된 날짜 스타일 추가
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: "blue",
      selectedTextColor: "white",
    };

    return marked;
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={getAgendaItems()}
        selected={selectedDate}
        markedDates={getMarkedDates()}
        loadItemsForMonth={loadItemsForMonth}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        renderItem={(item: any) => (
          <View style={[styles.item, { flexDirection: 'column', gap: 5 }]}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemTime}>{item.memo}</Text>
            <Text style={styles.itemTime}>{item.time}</Text>
          </View>
        )}
        renderEmptyData={() => (
          <View style={styles.emptyDate}>
            <Text style={styles.emptyText}>등록된 일정이 없습니다.</Text>
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