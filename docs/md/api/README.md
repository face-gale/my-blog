# Java正则表达式基本用法



## 正则表达式简介



正则表达式是使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。爬虫中解析html可以使用正则来方便的提取信息



## 正则表达式匹配规则

|  模式|描述                                       |
| ---- | ---- |
|  \w|匹配字母、数字、下划线                        |
|  \W|匹配非字母、数字、下划线                       |
|  \s|匹配任意空白字符，相当于[\t\n\r\f]             |
|  \S|匹配任意非空字符                           |
|  \d|匹配任意数字，相当于[0-9]                    |
|  \D|匹配非数字的字符                           |
|  \A|匹配字符串开头                            |
|  \Z|匹配字符串结尾，如果存在换行，只匹配到换行前的结束字符串       |
|  \z|匹配字符串结尾，如果存在换行，同时还会匹配换行符           |
|  \G|匹配最后匹配完成的位置                        |
|  \n|匹配一个换行符                            |
|  \t|匹配一个制表符                            |
|  ^|匹配一行字符串的开头                          |
|  $|匹配一行字符串的结尾                          |
|  .|	匹配任意字符，除了换行符                       |
|  [^…]|	不在[]中的字符，比如[^abc]匹配除了a、b、c之外的字符|
|  *	|匹配0个或多个表达式                        |
|  +	|匹配1个或多个表达式                        |
|  ?	|匹配0个或1个前面的正则表达式定义的片段，非贪婪方式        |
|  ()	|匹配括号内的表达式，也表示一个组                  |
|  {n}	|精确匹配n个前面的表达式，比如\d{n}，代表n个数字   |
|  {n,m}	|匹配n到m次由前面正则表达式定义的片段，贪婪方式      |

## 示例

```java
public class RegexAction {
    public static void main(String[] args) {
        String s = "Hello 123 4567 World_This is a Regex Demo";
        //match_1(s);
        //match_2(s);
        //match_3(s);
        //match_4(s);
        //match_5(s);
        match_6(s);
    }

    private static void match_1(String s) {
        Pattern pattern = Pattern.compile("^Hello\\s\\d\\d\\d\\s\\d{4}\\s\\w{10}");
        Matcher matcher = pattern.matcher(s);

        if(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }

    private static void match_2(String s) {
        Pattern pattern = Pattern.compile("Hello\\s(\\d+)\\s\\d{4}\\s\\w{10}");
        Matcher matcher = pattern.matcher(s);

        if(matcher.find()) {
            System.out.println(matcher.group(0));  //匹配到的整个结果
            System.out.println(matcher.group(1));  //匹配到的第一个括号中的结果
        }
    }

    private static void match_3(String s) {
        Pattern pattern = Pattern.compile("Hello\\s(\\d*)\\s\\d{4}\\s\\w{10}");
        Matcher matcher = pattern.matcher(s);

        if(matcher.find()) {
            System.out.println(matcher.group(0));  //匹配到的整个结果
            System.out.println(matcher.group(1));  //匹配到的第一个括号中的结果
        }
    }

    private static void match_4(String s) {
        Pattern pattern = Pattern.compile("Hello.*Demo");
        Matcher matcher = pattern.matcher(s);

        if(matcher.find()) {
            System.out.println(matcher.group(0));  //匹配到的整个结果
        }
    }

    /**
     * 贪婪匹配
     * 匹配中间数字，只能得到7
     * .*会尽可能多的匹配数据
     * @param s
     */
    private static void match_5(String s) {
        Pattern pattern = Pattern.compile("Hello.*(\\d+).*Demo");
        Matcher matcher = pattern.matcher(s);

        if(matcher.find()) {
            System.out.println(matcher.group(1));  //匹配到的整个结果

        }

    }

    /**
     * .*?非贪婪匹配
     * @param s
     */
    private static void match_6(String s) {
        Pattern pattern = Pattern.compile("Hello.*?(\\d+).*Demo");
        Matcher matcher = pattern.matcher(s);
        if(matcher.find())  {
            System.out.println(matcher.group());
            System.out.println(matcher.group(1));
        }
    }
    
	/**
     * 正则表达式字符串也可以不编译直接使用
     * @param s
     */
    private static void match_7(String s) {
        String regex = "Hello.*?(\\d+).*Demo";
        boolean flag = s.matches(regex);
        System.out.println(flag);
    }

}

```

- Pattern 类
  pattern 对象是一个正则表达式的编译表示

- Matcher 类
  Matcher 对象是对输入字符串进行解释和匹配操作的引擎

- find()方法
  尝试查找与该模式匹配的输入序列的下一个子序列，直到搜索到输入序列结束
  可以从指定位置开始匹配find（int start）