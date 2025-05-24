/**
 * Sockomo Giraffe Growth Stages Data
 * Contains mapping data for foot lengths to giraffe stages with characteristics and fun facts
 */

const GIRAFFE_STAGES = {
    newborn: {
        name: "Newborn/Calf",
        childAgeRange: "0 - 1 year",
        giraffeAgeRange: "Birth - 1 year",
        footLengthRange: "8.9 - 12.1 cm",
        height: {
            metric: "1.8 - 2 meters",
            imperial: "6 feet"
        },
        weight: {
            metric: "45 - 100 kg",
            imperial: "100 - 220 pounds"
        },
        imageUrl: "https://r2.flowith.net/files/o/1748052966607-Newborn_Giraffe_Cartoon_Image_Design_index_0@1024x1024.png",
        funFacts: [
            "A baby giraffe is already taller than most adult humans when it's born!",
            "Even though they fall to the ground at birth, they can stand up and walk in less time than it takes to watch a cartoon!",
            "Baby giraffes hang out in special \"kindergarten\" groups called creches while their moms find food!"
        ]
    },
    
    juvenile: {
        name: "Juvenile",
        childAgeRange: "1 - 4 years",
        giraffeAgeRange: "1 - 4 years",
        footLengthRange: "12.1 - 16.5 cm",
        height: {
            metric: "3 - 4 meters",
            imperial: "10 - 13 feet"
        },
        weight: {
            metric: "200 - 600 kg",
            imperial: "440 - 1320 pounds"
        },
        imageUrl: "https://r2.flowith.net/files/o/1748052960881-Juvenile_Giraffe_3D_Cartoon_Image_for_Kids_index_2@1024x1024.png",
        funFacts: [
            "Juvenile giraffes are like teenagers, growing super fast and learning how to be proper giraffes!",
            "Young males practice play-fighting by gently bumping necks – it's like practicing for future challenges!",
            "At this stage, giraffes are learning all the best spots to find the tastiest leaves!"
        ]
    },
    
    subadult: {
        name: "Subadult", 
        childAgeRange: "4 - 5 years",
        giraffeAgeRange: "4 - 5 years",
        footLengthRange: "15.6 - 19.2 cm",
        height: {
            metric: "4 - 5 meters",
            imperial: "13 - 16.5 feet"
        },
        weight: {
            metric: "600 - 900 kg",
            imperial: "1320 - 2000 pounds"
        },
        imageUrl: "https://r2.flowith.net/files/o/1748052958617-Subadult_Giraffe_Cartoon_Image_index_3@1024x1024.png",
        funFacts: [
            "Girl giraffes are ready to have their own babies when they reach this age!",
            "Subadults are almost as tall as adults, but they still have some growing (especially getting heavier and stronger!) to do",
            "Their horns called 'ossicones' are getting stronger and more fused to their skulls!"
        ]
    },
    
    adult: {
        name: "Adult",
        childAgeRange: "5 - 12 years",
        giraffeAgeRange: "5+ years",
        footLengthRange: "17.1 - 24.8 cm",
        height: {
            metric: "4.3 - 6 meters",
            imperial: "14 - 20 feet"
        },
        weight: {
            metric: "680 - 1360 kg", 
            imperial: "1500 - 3000 pounds"
        },
        imageUrl: "https://r2.flowith.net/files/o/1748052994540-mature_adult_giraffe_3D_cartoon_playful_image_index_4@1024x1024.png",
        funFacts: [
            "Giraffes are the tallest land animals on Earth! Their height helps them see predators far away and eat leaves no other animals can reach!",
            "Their tongues are long and dark (up to 1.5 feet!) so they can grab tasty leaves, even thorny ones, high up in trees!",
            "Even though they are so tall, giraffes can run as fast as many cars, reaching speeds up to 35-37 miles per hour!"
        ]
    }
};

// Export data for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GIRAFFE_STAGES };
}



