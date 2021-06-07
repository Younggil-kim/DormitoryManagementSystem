import pandas as pd
from pandas import DataFrame
from sklearn.metrics.pairwise import cosine_similarity

user_data = pd.read_csv('./data.csv')


user_based_collab = cosine_similarity(user_data, user_data)

user_based_collab = DataFrame(user_based_collab)

excel_file = user_based_collab.to_csv('./협업필터링결과.csv')



def get_user_based_collab(n):
    return user_based_collab[n].sort_values(ascending=False)[:10]

for i in range(0, 200):
    print(get_user_based_collab(i))

    
    

