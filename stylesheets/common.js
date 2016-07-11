$(document).ready(function() { 
			//点击获取验证码
			//console.log(code);
			var code;
			$("#get_IDCode").click(function(e) {
				code = codeGen();
				console.log(code);
				$("msg").val("");
				$("#icon-name").attr("style", "width:0.46rem; height:0.46rem; background-color:white;");
				$("#icon-phone").attr("style", "width:0.46rem; height:0.46rem; background-color:white;");
				//信息完整性验证
				if ($("#name").val() == "") {
					$("#name").val("");
					$("#icon-name").attr("style", "width:0.46rem; height:0.46rem; background-color:red;");
					$("#name").attr("placeholder","请输入姓名");
					e.preventDefault();
				} else if ($("#phone").val() == "") {
					$("#phone").val("");
					$("#icon-phone").attr("style", "width:0.46rem;height:0.46rem;background-color:red;");
					$("#phone").attr("placeholder", "请输入手机号");
					e.preventDefault();
				} else if( !(/^1[3|4|5|7|8]\d{9}$/.test($("#phone").val())) ) { 
			        $("#icon-phone").attr("style", "width:0.46rem;height:0.46rem;background-color:red;");
			        $("#phone").val("");
			        $("#phone").attr("placeholder", "您输入的手机号码有误");
			        e.preventDefault(); 
			    } 
				else {
					var count = 60;
					var name = $("#name").val().toString();
					var phone = $("#phone").val().toString();
					var content = '亲爱的用户，您的验证码是：' + code.toString();
					var req_data = {
						'key'          : '111111111111',
						'phonenum' 	   : phone,
						'content'      : content.toString(),
						'compaigncode' : '1086'
					}
					$.ajax({
						url  : "https://ebiz.aia.com.cn/w/action/smsService",
						dataType : 'json',
						data : req_data,
						//jsonp:'callback',
						success: function(data) {
							if (data.code == "success") {
								$("msg").val("获取验证码成功");
							} else  {
								$("msg").val("获取验证码失败");
							}
						},
						error: function(err) {
							$("msg").val("获取验证码发生错误");
						}
					});
					//获取验证码按钮倒计时
					$("#get_IDCode").attr('class', 'disabled');
					var t = setInterval(function() {
						count--;
						$("#get_IDCode").text("重新获取验证码("+count+"秒)");
						if(count <= 0) {
							clearInterval(t);
							$("#get_IDCode").attr('class', 'btn btn-danger');
							$("#get_IDCode").text("获取验证码");
						}
					},1000);

					e.preventDefault();
				}
			});
			
			$("#submit").click(function(e) {
				console.log(code);
				if ($("#IDCode").val() == "") {
					$("#msg").val("验证码不能为空");
					
				} else {
					var code_input = $("#IDCode").val();
					if (code_input == code) {
						window.location.href = "enroll_sucess.html";
					} else {
						$("#msg").val("验证码错误");
					}
					e.preventDefault();
				}
				
			});
			
			function codeGen () {
				var Num = ""; 
				for (var i = 0; i < 6; i++) 
				{ 
				Num += Math.floor(Math.random() * 10); 
				}
				return Num;
			}
});