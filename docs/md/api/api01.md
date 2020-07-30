# 修改 Git 提交记录的用户名

## 修改 Git 全局用户
```shell
git config user.name 'face-gale'
git config user.email '561703463@qq.com'
```
## 修改提交记录的用户名和邮箱
```shell
#!/bin/sh
git filter-branch --env-filter '
OLD_EMAIL="847022952@qq.com"
CORRECT_NAME="face-gale"
CORRECT_EMAIL="561703463@qq.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags 
```

```shell
#如果执行失败的话，执行一下这段命令

git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch Rakefile' HEAD

#还没有推送到远程,所以再执行一下命令
# git push origin --force --all
git push --force --tags origin 'refs/heads/*'
```

