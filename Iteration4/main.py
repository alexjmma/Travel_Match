class Main:
    def __init__(self):
        self.destination_list = []
        self.destination_dict = {}
        self.questions = []
        self.value_dict = {}
        self.parse_files()
        self.value_list = [0] * len(self.destination_list)
        # 35

    def parse_files(self):
        with open("Destinations.txt", "r") as fptr:
            for line in fptr:
                dest = line.rstrip('\n')
                self.destination_list.append(dest)
                self.destination_dict[dest] = 0
        fptr.close()
        with open("Questions.txt", "r") as fptr:
            for line in fptr:
                if line == "\n":
                    self.questions.append(line)
                else:
                    self.questions.append(line.rstrip('\n'))
            fptr.close()

        basic_list = []
        with open("Scales.txt", "r") as fptr:
            for line in fptr:
                line.rstrip('\n')
                add_line = line.rstrip('\n')
                basic_list.append(add_line)
        list_one, list_two = basic_list[::2], basic_list[1::2]
        for i in range(0, len(list_one)):
            self.value_dict[list_one[i]] = list_two[i].split()
        '''
        for k, v in self.value_dict.items():
            print(k, v)
        '''

    def process_input(self, choice):
        data = int(input())
        while data > choice:
            print("Enter a value between {} and {}, marking your decision.".format(1, choice))
            data = int(input())
        for k, v in self.destination_dict.items():
            self.destination_dict[k] += int(self.value_dict[k][data])
            self.value_dict[k] = self.value_dict[k][data::]

    def ask_questions(self):
        counter = 0
        while counter < len(self.questions):
            print(self.questions[counter])
            counter += 1
            choice = 1
            while self.questions[counter] != '\n':
                print("\t", end="")
                print(choice, end=". ")
                choice += 1
                print(self.questions[counter])
                counter += 1
            counter += 1
            self.process_input(choice - 1)
            print()

    def print_results(self):
        v = list(self.destination_dict.values())
        k = list(self.destination_dict.keys())
        print("Your Preferred destination is: ", end="")
        print(k[v.index(max(v))])




if __name__ == "__main__":
    program = Main()
    program.ask_questions()
    program.print_results()
