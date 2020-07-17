# Codewars JAVA初级编程题



## Bit Counting

- 写一个函数，它以一个整数作为输入，并返回该数字的二进制表示形式中等于`1`的个数。您可以保证输入是非负的。
- 示例：`1234`的二进制表示是`10011010010`，因此函数在本例中应返回`5`

```java
public class BitCounting {

  public static int countBits(int n){
    
    return Integer.bitCount(n);
  }
  
}
```

```java
public class BitCounting {

  public static int countBits(int n){
    int ret = n % 2;
    while ((n /= 2) > 0) ret += n % 2;
    return ret;
  }
  
}
```

```java
public class BitCounting {

  public static int countBits(int n){
    return (int) Integer.toBinaryString(n).chars()
              .filter(c -> c == '1')
              .count();
  }
  
}
```



## Descending Order

- 创建一个可以将任何非负整数作为参数的函数，并以降序返回其数字。 本质上，重新排列的数字为可排列的最大数值。
- 示例
  - Input: `42145` Output: `54421`
  - Input: `145263` Output: `654321`
  - Input: `123456789` Output: `987654321`

```java
import java.util.Comparator;
import java.util.stream.Collectors;

public class DescendingOrder {
    public static int sortDesc(final int num) {
        return Integer.parseInt(String.valueOf(num)
                                      .chars()
                                      .mapToObj(i -> 	 String.valueOf(Character.getNumericValue(i)))
                                      .sorted(Comparator.reverseOrder())
                                      .collect(Collectors.joining()));
    }
}
```

```java
import java.util.Arrays;
import java.util.Collections;

public class DescendingOrder {
    public static int sortDesc(final int num) {
        String[] array = String.valueOf(num).split("");
        Arrays.sort(array, Collections.reverseOrder());
        return Integer.valueOf(String.join("", array));
    }
}
```





## Regex validate PIN code

- ATM机允许使用4位或6位PIN码，而PIN码只能包含4位或6位的数字。如果函数传递了有效的PIN字符串，则返回true，否则返回false。
- 示例

```java
Solution.validatePin("1234") === true
Solution.validatePin("12345") === false
Solution.validatePin("a234") === false
```



```java
import java.util.regex.*;

public class Solution {

  public static boolean validatePin(String pin) {
    return pin.matches("\\d{4}|\\d{6}");
  }

}
```

```java
public class Solution {

  public static boolean validatePin(String pin) {
    if (pin.length() == 4 || pin.length() == 6) 
        return pin.chars().allMatch(Character::isDigit);
    return false;
  }

}
```




## Detect Pangram

- 全字母句是一个句子中至少包含字母表的所有字母一次。例如，"The quick brown fox jumps over the lazy dog"是一个全字母句，因为它使用字母A-Z至少一次（与大小写无关）

```java
public class PangramChecker {
  public boolean check(String sentence){
        for (char c = 'a'; c<='z'; c++)
            if (!sentence.toLowerCase().contains("" + c))
                return false;
        return true;

  }
}
```

```java
public class PangramChecker {
  public boolean check(String sentence){
    return sentence.chars().map(Character::toLowerCase).filter(Character::isAlphabetic).distinct().count() == 26;
  }
}
```

```java
public class PangramChecker {
  public boolean check(String s){
    return s.toLowerCase().chars().filter(Character::isLetter).distinct().count() == 26;
  }
}
```




## Your order, please

- 你的任务是对给定的字符串进行排序。字符串中的每个单词都将包含一个数字。这个数字是单词在结果中的位置。
  注意：数字可以是1到9。所以1是第一个单词（不是0）。
  如果输入字符串为空，则返回空字符串。输入字符串中的单词只包含有效的连续数字。

- 示例：

```java
"is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
"4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
""  -->  ""
```



```java
public class Order {
   public static String order(String words) {
        String[] arr = words.split(" ");
        StringBuilder result = new StringBuilder("");
        for (int i = 0; i < 10; i++) {
            for (String s : arr) {
                if (s.contains(String.valueOf(i))) {
                    result.append(s + " ");
                }
            }
        }
        return result.toString().trim();
    }
}
```

```java
import java.util.Arrays;
import java.util.Comparator;

public class Order {
  public static String order(String words) {
    return Arrays.stream(words.split(" "))
      .sorted(Comparator.comparing(
          s -> Integer.valueOf(s.replaceAll("\\D", ""))))
      .reduce((a, b) -> a + " " + b).get();
  }
}
```






## Stop Spinning My Words!


- 写一个函数，它接受一个或多个单词组成的字符串，并返回相同的字符串，但所有五个或更多字母的单词都颠倒过来。（传入的字符串只包含字母和空格，只有出现多个单词时才会包含空格。）


示例: 

```java
spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" 
spinWords( "This is a test") => returns "This is a test"
spinWords( "This is another test" )=> returns "This is rehtona test"
```



```java
import java.util.Arrays;

    public class SpinWords {

        public String spinWords(String sentence) {
            String[] words = sentence.split(" ");
            for (int i=0; i<words.length; i++) {
                if (words[i].length() >= 5) {
                    words[i] = new StringBuilder(words[i]).reverse().toString();
                }
            }
            return String.join(" ",words);
        }
    }

}
```

```java
import java.util.Arrays;
import java.util.stream.*;
public class SpinWords {

  public String spinWords(String sentence) {
    return Arrays.stream(sentence.split(" "))
      .map(w -> w.length()>4 ? new StringBuilder(w).reverse().toString() : w)
      .collect(Collectors.joining(" "));
  }
}
```



## Human Readable Time

- 编写一个函数，以非负整数（秒）作为输入，并以人类可读格式（HH:MM:SS）返回时间
  - `HH` = 小时, 填充到2位数, 范围: 00 - 99
  - `MM` = 分钟, 填充到2位数, 范围: 00 - 59
  - `SS` = 秒, 填充到2位数, 范围: 00 - 59
  - 最长时间不超过359999（99:59:59）

```java
public class HumanReadableTime {
  public static String makeReadable(int seconds) {
    return String.format("%02d:%02d:%02d", seconds / 3600, (seconds / 60) % 60, seconds % 60);
  }
}
```



## Two Sum

- 基于：http://oj.leetcode.com/problems/two-sum/
- 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出 两个相加为target的整数，并返回他们在数组中的下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。。
- 示例

```java
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

```java
public class Solution
{
    public static int[] twoSum(int[] numbers, int target)
    {
        for(int i = 0;i<numbers.length-1;i++){
          for(int j = i+1;j<numbers.length;j++){
            if(target-numbers[i] == numbers[j]){
              return new int[]{i,j};
            }
          }
        }
        return null;
    }
}
```

```java
import java.util.*;
public class Solution
{
    public static int[] twoSum(int[] numbers, int target)
    {
        Map<Integer,Integer> map = new HashMap<>(16);
        for(int i=0;i<numbers.length;i++){
          int num = target-numbers[i];
          if(map.containsKey(num)){
            return new int[]{map.get(num),i};
          }
          map.put(numbers[i],i);
        }
        return null;
    }
}
```



## Dubstep

- 假设一首歌包含一些单词（不包含WUB）。为了让这首歌混音，需要插入一定数量的单词“WUB”。一般要在歌曲的第一个单词（数字可能是零）之前，在最后一个单词（数字可能是零）之后，以及单词之间（至少在一对相邻单词之间至少一个“WUB”）。
- 例如， 一首歌的歌词是  "I AM X" ，可以转换成dubstep混音为 "WUBWUB**I**WUB**AM**WUBWUB**X**"， 而不能是 "WUBWUB**IAM**WUB**X**".
- 现在需要恢复原始歌曲。
- 输入项
  输入由单个非空字符串组成，仅由大写英文字母组成，字符串的长度不超过200个字符
- 输出量
  返回原始歌曲的歌词。用空格分隔单词。

```java
songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB")
  // =>  WE ARE THE CHAMPIONS MY FRIEND
```



```java
public class Dubstep {
  public static String SongDecoder (String song)
  {
     return song.replaceAll("(WUB)+", " ").trim();
  }
}
```

```java
import java.util.Arrays;
import java.util.stream.*;
public class Dubstep {
  public static String SongDecoder (String song)
  {
     return Arrays.stream(song.split("WUB"))
       .filter(word -> !word.isEmpty())
       .collect(Collectors.joining(" "));
   }
}
```



## Strip Comments

- 删除指定注释标记后面的所有文本。行末的空格也应该去掉。
- 示例

```java
// 输入字符串
apples, pears # and bananas
grapes
bananas !apples
```

```java
// 输出字符串
apples, pears
grapes
bananas
```

- 代码调用示例

```java
var result = 
  solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"
```



```java
import java.util.Arrays;
import java.util.stream.*;
public class StripComments {

    public static String stripComments(String text, String[] commentSymbols) {
        if(text.isEmpty()){
            return text;
        }
        return Arrays.stream(text.split("\n")).map(line -> {
            if(line.isEmpty()){
                return line;
            }
            for(int i=0;i<commentSymbols.length;i++){
                int index = line.indexOf(commentSymbols[i]);
                if(index != -1){
                    line = line.substring(0,index);
                }
            }
            return line.replaceAll("\\s+$","");
        }).collect(Collectors.joining("\n"));
    }
  
}
```

```java
import java.util.Arrays;
import java.util.stream.Collectors;

public class StripComments {

  public static String stripComments(String text, String[] commentSymbols) {
    String pattern = String.format(
        "[ ]*([%s].*)?$",
        Arrays.stream( commentSymbols ).collect( Collectors.joining() )
    );
    return Arrays.stream( text.split( "\n" ) )
        .map( x -> x.replaceAll( pattern, "" ) )
        .collect( Collectors.joining( "\n" ) );
  }

}
```

