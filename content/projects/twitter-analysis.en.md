---
title: Twitter Earthquake Data Analysis
description: The effect of the Twitter ban during the 2023 Turkey earthquakes.
thumbnailUrl: /uploads/twitter-analysis1.png
projectUrl: https://github.com/emomert/Twitter_Veri_Analizi_Deprem
publishedAt: 2023-02-18
---
## Overview
**Twitter Data Analysis: Feb 6 Earthquake & Access Restriction** is a data science project demonstrating the vital role of social media during the Kahramanmaraş earthquakes on February 6, 2023, and the impact of the subsequent access ban. Using time-series data generated via Python libraries, this project visualizes how the bandwidth throttling applied to Twitter during critical rescue hours drastically reduced interaction volumes.

## Tech Stack
- **Data Collection (Scraping):** The `snscrape` library was utilized to bypass Twitter API limitations and scrape historical data.
- **Data Processing:** **Python** and **Pandas** were used to clean raw data, organize timestamps, and aggregate tweet counts into 15-minute intervals.
- **Visualization:** **Matplotlib** and **Seaborn** libraries were chosen to convert the dataset into meaningful charts and highlight breakpoints.
- **Version Control:** Project source codes and notebook files are hosted on GitHub at the `emomert/Twitter_Veri_Analizi_Deprem` repository.

## Methodology and Data Cleaning
The project filtered and scraped tweets containing the keyword **"deprem"** (earthquake) starting from the moment the disaster struck. Since downloading every single tweet would be time-prohibitive, this keyword was selected as the best proxy for volume.

Data gaps (0 values) caused by global Twitter server issues between midnight and the morning of February 8 were identified in the dataset. These intervals were excluded from the average calculations to prevent analysis skew, ensuring data integrity.

![Netblocks Data](/uploads/twitter-analysis2.jpeg)

## Analysis and Key Findings
The analysis reveals a striking picture that aligns with NetBlocks data. With the restriction starting around 16:00 on February 8:
- A **36% decrease** in tweet volume was observed compared to the previous day.
- During this 12-hour restriction, users were forced to use VPNs, complicating access to location data shared by victims under the rubble.
- The data represents global volume; considering the lack of precise geolocation tags, the drop in the affected region was likely much more dramatic.

![Restriction Interval Graph](/uploads/twitter-analysis3.png)

## The Human Impact
In the earthquake zone, Twitter functioned less like a social media app and more like a "search and rescue radio." The analysis and feedback from the field at the time (e.g., broadcasts by Fatih Altaylı & Oğuzhan Uğur) suggest that the restriction disrupted coordination by approximately 70%. This project serves as data-driven evidence of the consequences of cutting off communication when every second counts.

/uploads/twitter-analysis-video.mp4

## Run the Project
You can access the full source code, data processing methods, and chart generation steps on GitHub.

[GitHub Repo: emomert/Twitter_Veri_Analizi_Deprem](https://github.com/emomert/Twitter_Veri_Analizi_Deprem)