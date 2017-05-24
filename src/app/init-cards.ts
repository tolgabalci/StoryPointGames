export class Init {
    loadCards(cardDeck) {
        console.log('Loading Cards.....Creating...');
        if (cardDeck == "Fibonacci") {
            var cards = [
                {
                    text: "0"
                },
                {
                    text: "1"
                },
                {
                    text: "2"
                },
                {
                    text: "3"
                },
                {
                    text: "5"
                },
                {
                    text: "8"
                },
                {
                    text: "13"
                },
                {
                    text: "21"
                },
                {
                    text: "34"
                },
                {
                    text: "55"
                },
                {
                    text: "89"
                },
                {
                    text: "?"
                },

            ];
        }
        else if (cardDeck == "Modified Fibonacci") {
            var cards = [
                {
                    text: "0"
                },
                {
                    text: "1/2"
                },
                {
                    text: "1"
                },
                {
                    text: "2"
                },
                {
                    text: "3"
                },
                {
                    text: "5"
                },
                {
                    text: "8"
                },
                {
                    text: "13"
                },
                {
                    text: "20"
                },
                {
                    text: "40"
                },
                {
                    text: "100"
                },
                {
                    text: "?"
                },

            ];

        }
        else if (cardDeck == "T-Shirts") {
            var cards = [
                {
                    text: "xxs"
                },
                {
                    text: "xs"
                },
                {
                    text: "s"
                },
                {
                    text: "m"
                },
                {
                    text: "l"
                },
                {
                    text: "xl"
                },
                {
                    text: "xxl"
                },
                {
                    text: "?"
                },

            ];

        }
        else if (cardDeck == "Powers of 2") {
            var cards = [
                {
                    text: "0"
                },
                {
                    text: "1"
                },
                {
                    text: "2"
                },
                {
                    text: "4"
                },
                {
                    text: "8"
                },
                {
                    text: "16"
                },
                {
                    text: "32"
                },
                {
                    text: "32"
                },
                {
                    text: "64"
                },

            ];

        }

        return cards;


    }

}

