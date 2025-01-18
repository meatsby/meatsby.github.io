# [JAVA] File I/O

```java
File f = new File(SAVE_FILE);
try {
    FileWriter fw = new FileWriter(f, true);
    fw.write(date + "," + plan + "\n");
    fw.close();
} catch (IOException e) {
    e.printStackTrace();
}
```

```java
try {
    BufferedReader br = new BufferedReader(new FileReader(SAVE_FILE));
    while (true) {
        String line = null;
        try {
            line = br.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (line == null) break;
        String date = line.split(",")[0];
        String detail = line.split(",")[1];
        planner.put(date, detail);
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
}
```