<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">

                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Login PAW UAJY</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>

                            <v-card-text>
                                <v-form>
                                    <v-text-field v-model="form.email" label="Login" name="login"
                                        prepend-icon="mdi-email" type="text" />
                                    <v-text-field v-model="form.password" label="Password" name="password"
                                        prepend-icon="mdi-lock" type="password" />
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary" @click="login()">Login</v-btn>
                            </v-card-actions>
                        </v-card>

                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

   export default {
        data () {
            return {
                form: {
                    'email': '',
                    'password': ''
                },
                user: new FormData,
            }
        },
        methods: {
            login() {
                this.user.append('email', this.form.email);
                this.user.append('password', this.form.password);
                var uri = this.$apiUrl + '/Auth';
                this.$http.post(uri, this.user).then(response => {
                    if(response.data.error === false) {
                        localStorage.setItem('token', response.data.token_encode);
                        this.$router.push('/dashboard/')
                    }
                        
                    else
                        alert('Incorrect Email or Password !')
                }).catch(error => {
                    alert('Error !')
                })
                
            }
        }
    }
</script>