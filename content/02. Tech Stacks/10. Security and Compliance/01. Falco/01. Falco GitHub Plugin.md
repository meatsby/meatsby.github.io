---
title: "Falco GitHub Plugin"
date: 2024-08-04 22:28:40 +0800
status: In Progress
draft: false
tags:
  - Falco
---
## Falco GitHub Plugin
---
### Prerequisites
- EC2 instance where Falco and plugin will run
- GitHub Token
	- Classic token with full repo scope

### Install Falco
- When using [Amazon Linux2 for EC2](https://falco.org/docs/install-operate/installation/#centos-rhel)

### Install GitHub Plugin
- [Stable versions](https://d20hasrqv82i0q.cloudfront.net/?prefix=plugins/stable/)
```
cd /tmp
wget https://download.falco.org/plugins/stable/github-0.7.5-linux-x86_64.tar.gz tar
xvzf github-0.7.5-linux-x86_64.tar.gz
mv libgithub.so /usr/share/falco/plugins/
wget https://download.falco.org/plugins/stable/github-rules-0.7.5.tar.gz
tar xvzf github-rules-0.7.5.tar.gz
```

### Store GitHub Token
```
sudo mkdir /root/.ghplugin
sudo vi /root/.ghplugin/github.token
```

### Change Security Group ingress
- Allow HTTP/HTTPS traffic from [GitHub webhook IP CIDRs](https://api.github.com/meta)

### Change Falco config
```
	load_plugins: [github]

  - name: github
    library_path: libgithub.so
    init_config:
	    websocketServerURL: "http://{PUBLIC_ADDRESS_OF_EC2}"
	    UseHTTPs: false
    open_params: '*'
```

### Launch Falco
```
sudo falco -c /etc/falco/falco.yaml -r github.yaml
```

### Test plugin and check logs
- Try Public repo -> Private repo
- Try Private repo -> Public repo
- Try delete repo

## References
---
- [GitHub Plugin for Falco](https://github.com/falcosecurity/plugins/tree/main/plugins/github)
