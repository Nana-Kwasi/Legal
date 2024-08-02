import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const ReadComponent = () => {
    const [expanded, setExpanded] = useState(Array(10).fill(false));

    const toggleExpand = (index) => {
        let newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    }

    const rights = [
        {
            title: "Right to Life",
            content: "Every person in Ghana has the inherent right to life, which shall be protected by law. No one shall be arbitrarily deprived of his or her life. This includes protection against unjustified killings by state or individuals.",
            link: "https://qknowbooks.gitbooks.io/jhs_1_social-citizenship-and-human-rights/content/rights_ghanaian_citizen_in_the_1992_constitution_o.html"
        },
        {
            title: "Right to Personal Liberty",
            content: "Everyone has the right to personal liberty and security. This right ensures that no person shall be subjected to arbitrary arrest, detention, or exile, protecting individual freedom.",
            link: "https://qknowbooks.gitbooks.io/jhs_1_social-citizenship-and-human-rights/content/rights_ghanaian_citizen_in_the_1992_constitution_o.html"
        },
        {
            title: "Right to Equality and Freedom from Discrimination",
            content: "All persons are equal before the law and entitled to the equal protection of the law. This includes freedom from discrimination on grounds of gender, race, color, ethnic origin, religion, creed, or social or economic status.",
            link: "https://qknowbooks.gitbooks.io/jhs_1_social-citizenship-and-human-rights/content/rights_ghanaian_citizen_in_the_1992_constitution_o.html"
        },
        {
            title: "Right to Freedom of Speech and Expression",
            content: "Every person has the right to freedom of speech and expression, which includes the freedom of the press and other media. This is essential for the functioning of democracy.",
            link: "https://www.amnesty.org/en/location/africa/west-and-central-africa/ghana/report-ghana/"
        },
        {
            title: "Right to Education",
            content: "Everyone has the right to education. This includes free, compulsory, universal basic education and the availability of secondary and higher education accessible to all.",
            link: "https://www.amnesty.org/en/location/africa/west-and-central-africa/ghana/report-ghana/"
        },
        {
            title: "Right to Work",
            content: "Everyone has the right to work, to free choice of employment, to just and favorable conditions of work, and to protection against unemployment.",
            link: "https://qknowbooks.gitbooks.io/jhs_1_social-citizenship-and-human-rights/content/rights_ghanaian_citizen_in_the_1992_constitution_o.html"
        },
        {
            title: "Right to Health",
            content: "Everyone has the right to the highest attainable standard of physical and mental health. This includes access to health care services and essential medicines.",
            link: "https://www.amnesty.org/en/location/africa/west-and-central-africa/ghana/report-ghana/"
        },
        {
            title: "Right to Privacy",
            content: "Everyone has the right to privacy, which includes the right to be free from arbitrary or unlawful interference with one's privacy, family, home, or correspondence.",
            link: "https://www.amnesty.org/en/location/africa/west-and-central-africa/ghana/report-ghana/"
        },
        {
            title: "Right to Freedom of Assembly and Association",
            content: "Everyone has the right to freedom of peaceful assembly and association. This is crucial for individuals to participate in society and express collective interests.",
            link: "https://qknowbooks.gitbooks.io/jhs_1_social-citizenship-and-human-rights/content/rights_ghanaian_citizen_in_the_1992_constitution_o.html"
        },
        {
            title: "Right to Participate in Government",
            content: "Every citizen has the right to take part in the government of their country, directly or through freely chosen representatives, and to have equal access to public service.",
            link: "https://www.amnesty.org/en/location/africa/west-and-central-africa/ghana/report-ghana/"
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Basic Rights of Citizens in Ghana</Text>
            {rights.map((right, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.title}>{right.title}</Text>
                    <Text style={styles.content}>
                        {expanded[index] ? right.content : `${right.content.substring(0, 100)}...`}
                    </Text>
                    <TouchableOpacity onPress={() => toggleExpand(index)}>
                        <Text style={styles.readMore}>
                            {expanded[index] ? "Read Less" : "Read All"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(right.link)}>
                        <Text style={styles.readMore1}>Read More</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop:50
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
       
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    readMore: {
        fontSize: 16,
        color: '#1e90ff',
        marginBottom: 10,
    },
    readMore1: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    }
});

export default ReadComponent;
