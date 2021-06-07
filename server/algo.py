import csv
import heapq


with open('./filter.csv','r', encoding='utf-8-sig') as file:
    csv_data = []
    count = 0
    for line in file.readlines():
        csv_data.append(line.split(','))


def split_four_people(lst):#가장 큰 4인을 반환하는 함수
    result_four_people = []
    for i in range(len(lst)):
        heap = []
        for j in range(len(lst[i])):
            tmp = []
            heapq.heappush(heap, (-float(lst[i][j]), j))
        for k in range(4):
            a, b = heapq.heappop(heap)
            tmp.append(b)
        result_four_people.append(tmp)
    return result_four_people
max_lst = split_four_people(csv_data)#0번 로우부터 가장 큰 4명 골라서 리턴해주는 함수


def check_belong_to_a_lot_people(lst):
    result = [[0, i] for i in range(len(lst))]
    for i in range(len(lst)):
        for j in range(len(lst[i])):
            result[lst[i][j]][0] += 1#속해있는 집단의 개수 출력
    result.sort()
    return result
    #0번 사람부터 몇개의 집단에 속해있는지 출력해주는 함수

belong = check_belong_to_a_lot_people(split_four_people(csv_data))


def convert_lst_heapq(n, lst):
    result_four_people = []
    for i in range(len(lst)):
        heap = []
        for j in range(len(lst[i])):
            tmp = []
            heapq.heappush(heap, (-float(lst[i][j]), j))
        for k in range(n):
            a, b = heapq.heappop(heap)
            tmp.append(b)
        result_four_people.append(tmp)
    return result_four_people

def final(belong):
    result = []
    chk = [False for _ in range(len(csv_data))]
    #적게 속해있는애부터 가져와서 4명씩 반환해주는게 맞다고 봄
    for i in range(len(belong)):
        cur = belong[i][1]#현재 남아있는 가장 적게 속해있는사람
        #가장 적게 속해있는사람이 속해있는 메인 그룹을 빼고,
        if chk[cur] is True:  # 이미 방문한새끼가 들어와있으면
            continue  # 무시
        #그 리스트를 가져왔을때, true가 4가 될때까지 계속 힙해오기.
        heap = []
        for k in range(len(csv_data[cur])):
            if chk[k] or chk[cur] is True:#이미 방문한새끼가 들어와있으면
                continue#무시
            tmp = []#방문한 사람이 아니라면 추가해주는 리스트
            for j in range(len(csv_data[cur])):#해당하는 열로 가서
                heapq.heappush(heap, (-float(csv_data[cur][j]), j))#해당하는 열을 힙으로 만들고

            for l in range(len(csv_data[cur])):#계속 뽑아. 언제까지? 4명이 채워질때까지
                a, b = heapq.heappop(heap)
                if chk[b] is True:
                    continue#근데 b가 방문한새끼면 이제 가져다 버려
                tmp.append(b)#아니면 추가해줘
                chk[b] = True
                if len(tmp) == 4:#만약 tmp 개수가 4명이 되면
                    result.append(tmp)#result에 추가해주고 종료해
                    break
    return result

final_result = final(belong)


test = set()
for i in range(len(final_result)):
    for j in range(len(final_result[i])):
        final_result[i][j] = str(final_result[i][j])
        test.add(final_result[i][j])

result_string = ''
for i in range(len(final_result)):
    result_string += ' '.join(final_result[i])
    result_string += '\\n'
print(result_string)
