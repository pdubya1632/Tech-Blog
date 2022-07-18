'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          date: new Date('2018-10-25'),
          title: 'Amazon’s extraordinary evolution',
          content:
            'The same evolution took place with Amazon Web Services, the company’s cloud computing subsidiary. It launched in 2006 as a "data storage service," but it has since become indispensable to modern tech companies — as necessary as paper clips once were but a damn sight more profitable. So many companies rely on Amazon’s services that when the industry grows, AWS does, too. Last year, AWS alone made more money than McDonald’s. AWS is quite possibly the future of Amazon, which explains why it was everywhere at re:MARS.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date('2019-01-08'),
          title: 'Apple Profits Nearly Double in Last Quarter',
          content:
            'Apple said its profit increased to $11.52 billion in its most recent quarter, up nearly a third from the same period a year earlier, showing that the company’s enormous business selling iPhones and other gadgets continues to breeze along. The strong results beat Wall Street estimates, sending the company’s shares about 4 percent higher on Wednesday to a new record and for a market value of more than $950 billion.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date('2021-11-12'),
          title: 'Tim Cook Wants an American Version of GDPR',
          content:
            'As a result, he said, algorithms have magnified our worst tendencies and "rogue actors and even governments" have used our data against us "to deepen divisions, incite violence and even undermine our shared sense of what is true and what is false." In one piercing portion, Mr. Cook criticized how companies like Facebook and Google — while taking care not to mention them by name — deliver personalized news feeds that lead to so-called filter bubbles and confirmation bias.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date('2020-07-22'),
          title:
            'Former Siri chief is leaving Apple to join Microsoft’s AI division',
          content:
            'At the time of Giannandrea’s hiring, the move was considered an admission from Apple that its current AI efforts were lackluster and needing revamping, evidenced by Siri falling far behind Google Assistant and Amazon’s Alexa in sophistication and industry adoption. Despite Siri living inside every iPhone and arriving on the scene before any other major voice assistant, Amazon and Google have led the race in consumer AI by incorporating their respective assistants into smart home products, a sector where Apple has lagged due to its stricter stances on user privacy and its delayed entrance to the smart speaker market.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date('2019-05-06'),
          title:
            'Google to Stop Selling Ads Based on Your Specific Web Browsing',
          content:
            'Alphabet’s stock rose 3.5 percent in after-hours trading, and some analysts recommended the company’s shares. With the regulatory issue settled, they said, Google could get back to focusing on selling ads across the internet." It’s like a delivery company having to pay for a parking ticket," Brian Wieser, a Pivotal Research analyst, said of the penalty, which Alphabet accounted for in the second quarter. "It’s not a meaningful fine in the context of the size of this company."',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
