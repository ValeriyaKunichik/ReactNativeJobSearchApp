import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item.employer_logo
              : "https://cdn-icons-png.flaticon.com/512/65/65053.png",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.company}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedJob, item)}>
            {item?.jobSource} -
          </Text>
          <Text style={styles.location}> {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;