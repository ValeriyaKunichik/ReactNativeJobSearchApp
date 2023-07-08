import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("Search", {
    SearchQuery: "React developer",
  });
  //console.log(data)
  const [selectedJob, setSelectedJob] = useState();
  
  const handleCardPress = (item) => {
    router.push({pathname:`/job-details/${item.id}`, params: {title: item.title, company:item.company, url:item.url.slice(6,)}});
    setSelectedJob(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          
          <Text>Something went wrong</Text>
        ) : (
          <View><FlatList
          data={data}
          renderItem={({ item }) => (
            <PopularJobCard
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
          )}
          
          keyExtractor={item => item.id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />
          </View>
        )}
      </View>
    </View>
  );
};

export default Popularjobs;